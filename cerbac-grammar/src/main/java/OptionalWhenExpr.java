public class OptionalWhenExpr implements AST {

    String when;

    public OptionalWhenExpr(String when) {
        this.when = when;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "when:" + when + ",";
    }
}
