public class OptionalHowExpr implements AST {

    String how;

    public OptionalHowExpr(String how) {
        this.how = how;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "how:" + how + ",";
    }
}
