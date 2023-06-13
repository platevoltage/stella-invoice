import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { Tag } from "../interfaces";

interface Props {
    invoiceData: any;
}

interface ReducedTag extends Tag {
    qty: number;
}

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    headerLeft: {
        margin: 30,
        padding: 10,
        fontSize: 8,
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
        fontSize: 18,
        color: "#5090bc"
    },
    billToLeft: {
        marginLeft: 30,
        padding: 10,
        fontSize: 8,
    },
    billToRight: {
        marginRight: 30,
        padding: 10,
        fontSize: 8,
        position: "absolute",
        right: "0"
    },
    line: {
        marginLeft: 30,
        marginRight: 30,
        height: 0,
        borderTopWidth: 1, 
        borderColor: '#5090bc', 
    },
    dottedLine: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 0,
        borderTopWidth: 1, 
        borderStyle: "dashed",
        borderColor: '#bbbbbb', 
    },
    tableHeader: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        fontSize: 8,
        backgroundColor: '#dce9f2',
        color: '#5090bc', 
        position: "relative"
    },
    tableRow: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 10, 
        position: "relative"
    },
    dateColumn: {
        padding: 3,
        position: "absolute",
        left: 14
    },
    descriptionColumn: {
        padding: 3,
        left: 180,
        width: 160
    },
    qtyColumn: {
        padding: 3,
        position: "absolute",
        left: 360
    },
    rateColumn: {
        padding: 3,
        position: "absolute",
        right: 110,
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
    },
    logo: {
        width: "60px"
    }
});
  
  // Create Document Component
function Invoice({invoiceData}: Props) {
    let total: number = 0;
    const date = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const data: Tag[] = invoiceData.data;
    const dataReduced: ReducedTag[] = []; 
    for (let tag of data) {
        total += parseFloat(tag.deliveryFee);
        let identicalTag = false;
        for (let tagReduced of dataReduced) {
            if (tagReduced.destinationName === tag.destinationName &&
                tagReduced.destinationStreet === tag.destinationStreet &&
                tagReduced.originStreet === tag.originStreet &&
                tagReduced.deliveryFee === tag.deliveryFee
            ) {
                tagReduced.qty++;
                identicalTag = true;
                break;
            }
        }
        if (!identicalTag) dataReduced.push({...tag, qty: 1});
    }
    
    return (
        <div style={{position: "fixed", left: 0, top: "30px"}}>
            <PDFViewer style={styles.viewer}>
                {/* Start of the document*/}
                <Document>
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    <View style={styles.headerLeft}>
                        <Text>Stella Courier LLC</Text>
                        <Text>PO Box 10141</Text>
                        <Text>Berkeley, CA 94709 US</Text> 
                        <Text>admin@stellacourier.com</Text> 
                        <Text>www.stellacourier.com</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Image src="./logo.png" style={styles.logo}/>
                    </View>
                    <View style={styles.INVOICE}>
                        <Text>INVOICE</Text>
                    </View>
                    <View>
                        <View style={styles.billToLeft}>
                            <Text>BILL TO</Text>
                            <Text>{invoiceData.name}</Text>
                            <Text> </Text>
                            <Text> </Text>
                        </View>
                        <View style={styles.billToRight}>
                            <Text>INVOICE# xxxx</Text>
                            <Text>DATE {date.toLocaleDateString()}</Text>
                            <Text>DUE DATE {dueDate.toLocaleDateString()}</Text>
                            <Text>TERMS xxxx</Text>
                        </View>
                        
                    </View>
                    <View style={styles.line} />
                    <View style={styles.tableHeader}>
                        <View style={styles.dateColumn}>
                            <View style={{position: "relative"}}>
                                <Text>DATE</Text>
                            </View>
                        </View>
                        <View style={styles.descriptionColumn}>
                            <Text>DESCRIPTION</Text>
                        </View>
                        <View style={styles.qtyColumn}>
                            <Text>QTY</Text>
                        </View>
                        <View style={styles.rateColumn}>
                            <Text>RATE</Text>
                        </View>
                        <View style={styles.amountColumn}>
                            <Text>AMOUNT</Text>
                        </View>
                    </View>
                    {dataReduced.map((line: any, index: number) =>
                    <View style={styles.tableRow}>
                        <View style={styles.dateColumn}>
                            <Text>{(new Date(line.creationTime)).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.descriptionColumn}>
                            <Text>{line.destinationName} {line.destinationStreet} {line.destinationFloorStreetApt} {line.destinationPostalCode}</Text>
                            <Text>{line.extras}</Text>
                        </View>
                        <View style={styles.qtyColumn}>
                            <Text>{line.qty}</Text>
                        </View>
                        <View style={styles.rateColumn}>
                            <Text>${ (line.deliveryFee * 1).toFixed(2) }</Text>
                        </View>
                        <View style={styles.amountColumn}>
                            <Text>${ (line.deliveryFee * line.qty).toFixed(2) }</Text>
                        </View>
                    </View>
                    )}
                    <View style={styles.dottedLine} />
                    <View style={styles.totalRow}>
                        <View style={styles.totalLeft}>
                            <Text>We appreciate your business ! Please contact</Text>
                            <Text>us at office@stellacourier for any question or</Text>
                            <Text>to place future orders. If you wish to open an</Text>
                            <Text>account with Stella Courier please email info@stellacourier.com</Text>
                        </View>
                        <View style={styles.totalRight}>
                            <Text>BALANCE DUE</Text>
                            <View style={styles.price}>
                                <Text>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.smallText}>
                        {invoiceData.data.map((line: any, index: number) =>
                            <div key={index}>
                                <Text>
                                    {line.destinationName} {line.destinationStreet} {line.destinationFloorStreetApt} {line.destinationPostalCode}
                                </Text>
                                <Text>
                                    {line.extras}
                                </Text>
                                <Text>
                                    ${line.deliveryFee}
                                </Text>
                                <Text>{"\n\n"}</Text>
                            </div> 
                        )} */}
                        {/* <Text>
                            {invoiceData.data[0].destinationName}
                        </Text> */}
                        {/* <Text>__________________________________________________________</Text>
                    </View>
                    <View style={styles.smallText}>
                        <Text>BALANCE DUE</Text>
                    </View>
                    <View style={styles.totalText}>
                        <Text>${total.toFixed(2)}</Text>
                    </View> */}
                </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}
export default Invoice;