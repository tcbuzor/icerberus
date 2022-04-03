import java_cup.runtime.Symbol;

public class LexerData {
    private Symbol symbol;
    private int line;
    private int col;
    private Object value;

    public LexerData(Symbol sym, int line, int col, Object value) {
        this.symbol = sym;
        this.line = line;
        this.col = col;
        this.value = value;
    }

    public Symbol getSymbol(){
        return this.symbol;
    }

    public int getLine(){
        return this.line;
    }

    public int getCol(){
        return this.col;
    }

    public Object getValue(){
        return this.value;
    }

}
