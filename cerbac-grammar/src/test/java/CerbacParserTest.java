import java_cup.runtime.Symbol;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.truth.Truth.assertThat;

/**
 * This is an integration test.
 */
public class CerbacParserTest {

    private static final String TEST_FILE_DIR = "src/test/data/";
    private static final String TEST_FILE = "src/test/data/testa.txt";
    private static final boolean PROCESS_DIR = false;
    private static final boolean PRETTY_PRINT = false;
    private List<LexerData> lexerDataList = new ArrayList<LexerData>();

    @Before
    public void setUp() {
        lexerDataList = new ArrayList<LexerData>();
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void parseTestFiles() throws Exception {
        File[] files = null;
        if (PROCESS_DIR) {
            files = getFiles(TEST_FILE_DIR);
            assert (files).length > 0;

        } else {

            File inputFile = getFile(TEST_FILE);
            assertThat(inputFile.isFile()).isTrue();
            files = new File[1];
            files[0] = inputFile;
        }

        Symbol sym;

        for (File file : files) {
            System.out.println("==== Test File to Scan: " + file.getName() + " ======" + "\n");

            CerbacLexer lexer = new CerbacLexer(new FileReader(file));
            parser parser = new parser(lexer); // create parser
            CerbacPolicy cerbacPolicy = null;
            cerbacPolicy = (CerbacPolicy) parser.parse().value;
            System.out.print(cerbacPolicy.toString(0) + "\n");


            System.out.println("==== End Scanning of test File: " + file.getName() + " ======" + "\n");
        }

    }

    private void processSymbol(Symbol sym) {
        if (!PRETTY_PRINT) {

            System.out.println("Token " + sym +
                    ", with value = " + sym.value +
                    "; at line " + sym.left + ", column " + sym.right);
        } else {

            LexerData lexData = new LexerData(sym, sym.left + 1, sym.right, sym.value);
            lexerDataList.add(lexData);

        }
    }


    private static File getFile(String pathName) throws IOException {
        String path = pathName;
        File pwd = new File(".").getCanonicalFile();
        assertThat(pwd.isDirectory()).isTrue();

        File file = new File(path);
        if (!file.isFile()) {
            throw new FileNotFoundException(path);
        }
        return file;
    }

    private static File[] getFiles(String directory) throws IOException {
        File dir = new File(directory);

        File[] files = dir.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.toLowerCase().endsWith(".txt") || name.toLowerCase().endsWith(".as");
            }
        });
        return files;
    }

    private void printLexerDataTable() {

        System.out.println("---------------------------------------------------------------------");
        System.out.printf("%10s %10s %10s %10s", "TYPE", "LINE", "COL", "VALUE");
        System.out.println();
        System.out.println("----------------------------------------------------------------------");

        for (LexerData lexerData : lexerDataList) {

            System.out.format("%10s %10s %10s %10s",
                    lexerData.getSymbol(), lexerData.getLine(), lexerData.getCol(), lexerData.getValue());
            System.out.println();
        }

        System.out.println("----------------------------------------------------------------------");

        lexerDataList = new ArrayList<LexerData>();

    }


}

