public class OptionalWhereExpr implements AST {

    String where;

    public OptionalWhereExpr(String where) {
        this.where = where;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "where:" + where + ",";
    }
}
