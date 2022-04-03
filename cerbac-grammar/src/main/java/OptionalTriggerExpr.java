public class OptionalTriggerExpr implements AST {

    String event;

    public OptionalTriggerExpr(String event) {
        this.event = event;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "trigger:" + event + ",";
    }
}
