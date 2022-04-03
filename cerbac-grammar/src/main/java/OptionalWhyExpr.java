public class OptionalWhyExpr implements AST {

    String why;

    public OptionalWhyExpr(String why) {
        this.why = why;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "why:" + why + ",";
    }
}
