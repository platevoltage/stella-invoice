import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
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
    smallText: {
        margin: 10,
        padding: 10,
        fontSize: 8
    },
    totalText: {
        margin: 10,
        padding: 10,
        fontSize: 14
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
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
                    <View style={styles.smallText}>
                        <Text>Stella Courier LLC</Text>
                        <Text>PO Box 10141</Text>
                        <Text>Berkeley, CA 94709 US</Text> 
                        <Text>admin@stellacourier.com</Text> 
                        <Text>www.stellacourier.com</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>INVOICE</Text>
                    </View>
                    <View style={styles.smallText}>
                        <Text>BILL TO:</Text>
                        <Text>{invoiceData.name}</Text>
                        <Text>__________________________________________________________</Text>
                    </View>
                    <View style={styles.smallText}>
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
                        )}
                        {/* <Text>
                            {invoiceData.data[0].destinationName}
                        </Text> */}
                        <Text>__________________________________________________________</Text>
                    </View>
                    <View style={styles.smallText}>
                        <Text>BALANCE DUE</Text>
                    </View>
                    <View style={styles.totalText}>
                        <Text>${total.toFixed(2)}</Text>
                    </View>
                </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}
export default Invoice;