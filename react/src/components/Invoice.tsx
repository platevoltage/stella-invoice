import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";

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
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
});
  
  // Create Document Component
function Invoice() {
    return (
        <div style={{position: "fixed", left: 0, top: "30px"}}>
            <PDFViewer style={styles.viewer}>
                {/* Start of the document*/}
                <Document>
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                    <Text>Hello</Text>
                    </View>
                    <View style={styles.section}>
                    <Text>World</Text>
                    </View>
                </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}
export default Invoice;