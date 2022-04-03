public class Utility {

    private Utility() {}
    private static boolean headerWritten = false;

    public static void error(int line , long col, String text) {

        if(!headerWritten) {
            writeHeader();
            headerWritten = true;
        }

        System.out.format("%10s %10s %10s %10s",  "ILLEGAL", line, col, text);
        System.out.println();
    }

    public static void writeHeader() {
        System.out.println("---------------------------------------------------------------------");
        System.out.printf("%10s %10s %10s %10s", "TYPE", "LINE", "COL", "VALUE");
        System.out.println();
        System.out.println("----------------------------------------------------------------------");
    }

    public static String getTabs(int depth) {
        String tabs = "";
        for (int i = 0; i < depth; i++) {
            tabs += "\t";
        }

        return tabs;
    }
}
