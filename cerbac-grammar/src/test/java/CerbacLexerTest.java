
import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assertWithMessage;

import com.google.common.base.Objects;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import java_cup.runtime.*;

/**
 * This is an integration test.
 */
public class CerbacLexerTest {

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

    // @Test
    public void scanTestFileBasic() throws Exception {
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
            for (sym = lexer.next_token(); sym.sym != 0; sym = lexer.next_token()) {
                processSymbol(sym);
            }
            if (PRETTY_PRINT) {
                printLexerDataTable();
            }

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
                return name.toLowerCase().endsWith(".txt");
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
