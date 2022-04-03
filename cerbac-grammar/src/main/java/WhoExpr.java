public class WhoExpr implements AST {

    String who;

    public WhoExpr(String who) {
        this.who = who;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "who:" + who + ",";
    }
}
