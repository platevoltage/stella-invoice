import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { Tag } from "../interfaces";
import { useState, useEffect } from "react";
import "./Invoice.css";
import imgUrl from '../assets/logo.png';

interface Props {
    invoiceData: any;
    setShowInvoice: (x: boolean) => void;
}

interface ReducedTag extends Tag {
    type: string;
    qty: number;
}


const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
        color: "black",
        paddingBottom: 30,
        paddingTop: 30
    },
    bold: {
        fontFamily: "Helvetica-Bold",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    headerLeft: {
        marginLeft: 30,
        padding: 10,
        fontSize: 10,
    },
    headerRight: {
        margin: 30,
        paddingRight: 10,
        fontSize: 8,
        position: "absolute",
        right: "0"
    },
    INVOICE: {
        marginLeft: 30,
        padding: 10,
        fontSize: 24,
        color: "#5090bc"
    },
    billToLeft: {
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 10,
        minHeight: 50
    },
    billToRight: {
        marginTop: 10,
        // marginRight: 60,
        fontSize: 10,
        position: "absolute",
        right: 90,
        // border: "1px solid red"
    },
    line: {
        marginLeft: 30,
        marginRight: 30,
        height: 0,
        borderTopWidth: 1, 
        borderColor: "#5090bc", 
    },
    memo: {
        fontSize: 10,
        marginTop: 10,
        marginLeft: 40
    },
    dottedLine: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 0,
        borderTopWidth: 1, 
        borderStyle: "dashed",
        borderColor: "#bbbbbb", 
    },
    tableHeader: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        fontSize: 8,
        height: 14,
        backgroundColor: "#dce9f2",
        color: "#5090bc", 
        position: "relative"
    },
    tableRow: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 10, 
        position: "relative",
    },
    dateColumn: {
        padding: 3,
        position: "absolute",
        left: 10
    },
    idRefColumn: {
        padding: 3,
        position: "absolute",
        left: 80,
        width: 90
    },
    serviceColumn: {
        padding: 3,
        position: "absolute",
        left: 180,
        width: 100
    },
    descriptionColumn: {
        padding: 3,
        left: 290,
        width: 200,
        minHeight: 40
    },
    qtyColumn: {
        padding: 3,
        position: "absolute",
        right: 170,
        textAlign: "right",
    },
    rateColumn: {
        padding: 3,
        position: "absolute",
        right: 100,
        textAlign: "right",
    },
    amountColumn: {
        padding: 3,
        position: "absolute",
        right: 26,
        textAlign: "right",
    },
    totalRow: {
        position: "relative",
    },
    totalLeft: {
        marginLeft: 30,
        padding: 10,
        fontSize: 10,
        width: "40%",
    },
    totalRight: {
        position: "absolute",
        right: 0,
        marginRight: 30,
        padding: 10,
        fontSize: 10,
        width: "40%",
    },
    price: {
        margin: 8,
        position: "absolute", 
        right: 0,
        fontSize: 20,
    },
    
    totalText: {
        margin: 10,
        padding: 10,
        fontSize: 14
    },
    viewer: {
        width: window.innerWidth, 
        height: window.innerHeight,
        border: "none",
        backgroundColor: "#ffffff"
    },
    logo: {
        width: "60px"
    },
    footer: {
        position: "absolute",
        bottom: 24,
        fontSize: 10,
        textAlign: "center",
        width: "100%"
    }
});
  
const defaultPaymentAddress = 
`Stella Courier LLC
PO Box 10141
Berkeley, CA 94709 US
admin@stellacourier.com
www.stellacourier.com`;

// Create Document Component
function Invoice({invoiceData, setShowInvoice}: Props) {
    const [invoiceNum, setInvoiceNum] = useState(0);
    const [terms, setTerms] = useState(15);
    const [memo, setMemo] = useState("");
    const [clientAddress, setClientAddress] = useState(invoiceData.name);
    const [paymentAddress, setPaymentAddress] = useState(defaultPaymentAddress);
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem(invoiceData.name);
        const savedInvoiceNum = localStorage.getItem("INVOICE_NUM");
        if (savedInvoiceNum) {
            setInvoiceNum(+savedInvoiceNum);
        }
        if (savedData) {
            const savedDataParsed = JSON.parse(savedData);
            setTerms(savedDataParsed.terms);
            setMemo(savedDataParsed.memo.trim());
            setClientAddress(savedDataParsed.clientAddress.trim());
            setPaymentAddress(savedDataParsed.paymentAddress.trim());
            if ((savedDataParsed.clientAddress || "").trim().length === 0) {
                setClientAddress(invoiceData.name);
            } else {
                setClientAddress(savedDataParsed.clientAddress);
            }
            if ((savedDataParsed.paymentAddress || "").trim().length === 0) {
                setPaymentAddress(defaultPaymentAddress);
            } else {
                setPaymentAddress(savedDataParsed.paymentAddress);
            }
        }
    },[]);

    function handleGo() {
        setFormFilled(true);
        const storageObject = {
            memo,
            terms,
            clientAddress,
            paymentAddress
        }
        localStorage.setItem(invoiceData.name, JSON.stringify(storageObject));
        localStorage.setItem("INVOICE_NUM", (invoiceNum+1).toString());
    }
    let total = 0;
    const date = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + terms);

    const data: Tag[] = invoiceData.data;
    const dataReduced: ReducedTag[] = []; 
    for (const tag of data) {
        total += parseFloat(tag.deliveryFee.replace(/\$/g, ""));
        const identicalTag = false;
        // for (let tagReduced of dataReduced) {
        //     if (tagReduced.destinationName === tag.destinationName &&
        //         tagReduced.destinationStreet === tag.destinationStreet &&
        //         tagReduced.originStreet === tag.originStreet &&
        //         tagReduced.deliveryFee === tag.deliveryFee &&
        //         tagReduced.creationTime === tag.creationTime
        //     ) {
        //         tagReduced.qty++;
        //         identicalTag = true;
        //         break;
        //     }
        // }
        if (!identicalTag) dataReduced.push({...tag, qty: 1, type: "SF Messenger\n Service"});
    }
    
    return (
        <div style={{position: "fixed", left: 0, top: "30px", display: "flex", justifyContent: "center", flexDirection: "row", width: "100vw", border: "none"}}>
            { (!formFilled) ?
                <div className="popup">
                    <label htmlFor="invoice-num">Invoice #:</label>
                    <input className="input" type="number" id="invoice-num" name="invoice-num" value={invoiceNum} onChange={(e) => setInvoiceNum(+e.target.value)}>
                    </input>
                    <br></br>
                    <label htmlFor="terms">Terms:</label>
                    <input className="input" type="number" id="terms" name="terms" value={terms} onChange={(e) => setTerms(+e.target.value)}></input>
                    <br></br>
                    <label htmlFor="memo">Memo:</label>
                    <textarea rows={4} className="input" id="memo" name="memo" value={memo} onChange={(e) => setMemo(e.target.value)}></textarea>
                    <br></br>
                    <label htmlFor="client-address">Client Address:</label>
                    <textarea rows={5} className="input" id="client-address" name="client-address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)}></textarea>
                    <br></br>
                    <label htmlFor="payment-address">Payment Address:</label>
                    <textarea rows={5} className="input" id="payment-address" name="payment-address" value={paymentAddress} onChange={(e) => setPaymentAddress(e.target.value)}></textarea>
                    <div className="button-group">           
                        <button className="button" onClick={() => setShowInvoice(false)}>Cancel</button>
                        <button className="button" onClick={handleGo}>Go!</button>
                    </div>
                </div>
                :
                <>
            
                    <button onClick={() => setShowInvoice(false)} className="back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </button>

                    <PDFViewer style={styles.viewer} showToolbar={true}>
            
                        <Document>
             
                            <Page size="LETTER" style={styles.page}>

                                <View style={styles.headerLeft}>
                                    <Text>{paymentAddress}</Text>
                                </View>
                                <View style={styles.headerRight}>
                                    <Image src={imgUrl} style={styles.logo}/>
                                </View>
                                <View style={styles.INVOICE}>
                                    <Text>INVOICE</Text>
                                </View>
                                <View>
                                    <View style={styles.billToLeft}>
                                        <Text style={styles.bold}>BILL TO</Text>
                                        <Text>{clientAddress}</Text>
                                    </View>
                                    <View style={styles.billToRight}>
                                        <View style={{position: "absolute", width: 80, right: 4, textAlign: "right", ...styles.bold}}>
                                            <Text>INVOICE#</Text>
                                            <Text>DATE</Text>
                                            <Text>DUE DATE</Text>
                                            <Text>TERMS</Text>
                                        </View>
                                        <View style={{position: "absolute",width: 80, left: 0}}>
                                            <Text>{invoiceNum}</Text>
                                            <Text>{date.toLocaleDateString()}</Text>
                                            <Text>{dueDate.toLocaleDateString()}</Text>
                                            <Text>NET {terms}</Text>
                                        </View>
                                    </View>
                                
                                </View>
                                <View style={styles.line} />
                                <View style={styles.memo}>
                                    <Text>{memo}</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <View style={styles.dateColumn}>
                                        <View style={{position: "relative"}}>
                                            <Text>DATE</Text>
                                        </View>
                                    </View>
                                    <View style={styles.idRefColumn}>
                                        <Text>ID / REFERENCE</Text>
                                    </View>
                                    <View style={styles.serviceColumn}>
                                        <Text>SERVICE</Text>
                                    </View>
                                    <View style={styles.descriptionColumn}>
                                        <Text>DESCRIPTION</Text>
                                    </View>
                                    <View style={styles.amountColumn}>
                                        <Text>AMOUNT</Text>
                                    </View>
                                </View>
                                {dataReduced.map((line: any, index: number) =>
                                    <View style={styles.tableRow} key={index} wrap={false}>
                                        <View style={styles.dateColumn}>
                                            <Text>{(new Date(line.readyTime.split(" ")[0])).toLocaleString('en-US', { timeZone: "UTC" }).split(",")[0]}
                                            </Text>
                                        </View>
                                        <View style={styles.idRefColumn}>
                                            <Text>{line.jobId}</Text>
                                            <Text>{line.billingReference}</Text>
                                        </View>

                                        <View style={styles.serviceColumn}>
                                            <Text>{line.service}</Text>
                                        </View>

                                        <View style={styles.descriptionColumn}>
                                            <Text>{line.destinationName} {line.destinationStreet} {line.destinationFloorStreetApt} </Text>
                                            <Text>{line.destinationCity} {line.destinationPostalCode}</Text>
                                            <Text>{line.extras}</Text>
                                            <Text>{line.deliveryNotes}</Text>
                                            <Text>{line.pod}</Text>
                                            <Text> </Text>
                                        </View>
                    
                                        <View style={styles.amountColumn}>
                                            <Text>${ ((line.deliveryFee).replace(/\$/g, "") * line.qty).toFixed(2) }</Text>
                                        </View>
                                    </View>
                                )}
                                <View style={styles.dottedLine} />
                                <View style={styles.totalRow}>
                                    <View style={styles.totalLeft}>
                                        <Text>We appreciate your business ! Please contact</Text>
                                        <Text>us at office@stellacourier for any question or</Text>
                                        <Text>to place future orders. If you wish to open an</Text>
                                        <Text>account with Stella Courier please email</Text>
                                        <Text>info@stellacourier.com</Text>
                                    </View>
                                    <View style={styles.totalRight}>
                                        <Text>BALANCE DUE</Text>
                                        <View style={styles.price}>
                                            <Text>${total.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.footer}>
                                    <Text>an 18% late fee will applied to all past due invoices.</Text>
                                </View>
            
                            </Page>
                        </Document>
                    </PDFViewer>
                </>
            }
        </div>
    );
}
export default Invoice;