import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image
} from "@react-pdf/renderer";
import { Tag } from "../interfaces";
interface Props {
    invoiceData: any;
}
// Create styles
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
        // width: "40%",
        // backgroundColor: "#555555",
        // position: "absolute"
    },
    headerRight: {
        margin: 30,
        paddingRight: 10,
        fontSize: 8,
        // width: "40%",
        // backgroundColor: "#444444",
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
        // width: "40%",
        // backgroundColor: "#555555",
        // position: "absolute"
    },
    billToRight: {
        marginRight: 30,
        padding: 10,
        fontSize: 8,
        position: "absolute",
        right: "0"
        // width: "40%",
        // backgroundColor: "#555555",
        // position: "absolute"
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
        height: 0,
        borderTopWidth: 1, 
        borderStyle: "dashed",
        borderColor: '#888888', 
    },
    tableHeader: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        height: 16,
        fontSize: 8,
        backgroundColor: '#dce9f2',
        color: '#5090bc', 
        position: "relative"
    },
    tableRow: {
        marginLeft: 15,
        marginRight: 15,
        // marginTop: 0,
        // height: ,
        fontSize: 10,
        // backgroundColor: '#dce9f2',
        // color: '#5090bc', 
        position: "relative"
    },
    dateColumn: {
        padding: 3,
        position: "absolute",
        left: 14
    },
    descriptionColumn: {
        padding: 3,
        position: "absolute",
        left: 180
    },
    qtyColumn: {
        padding: 3,
        position: "absolute",
        left: 360
    },
    rateColumn: {
        padding: 3,
        position: "absolute",
        left: 420
    },
    amountColumn: {
        padding: 3,
        position: "absolute",
        left: 500
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
    const data: Tag[] = invoiceData.data;
    for (let line of data) {
        total += parseFloat(line.deliveryFee)
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
                            <Text>DATE xxxx</Text>
                            <Text>DUE DATE xxxx</Text>
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

                    <View style={styles.tableRow}>
                        <View style={styles.dateColumn}>
                            <Text>xx/xx/xxxx</Text>
                        </View>
                        <View style={styles.descriptionColumn}>
                            <Text>xxxxxx</Text>
                        </View>
                        <View style={styles.qtyColumn}>
                            <Text>xx</Text>
                        </View>
                        <View style={styles.rateColumn}>
                            <Text>xx.xx</Text>
                        </View>
                        <View style={styles.amountColumn}>
                            <Text>xx.xx</Text>
                        </View>
                    </View>
                    {/* <View style={styles.dottedLine} /> */}
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