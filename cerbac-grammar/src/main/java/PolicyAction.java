public class PolicyAction implements AST {
    String action;

    public PolicyAction(String action) {
        this.action = action;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + action;
    }
}
