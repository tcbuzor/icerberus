import java.util.List;

public class ActionExpr implements AST {
    List<PolicyAction> policyActions;

    public ActionExpr(List<PolicyAction> policyActions) {
        this.policyActions = policyActions;
    }

    @Override
    public String toString(int pos) {
        for(PolicyAction p: policyActions) {
            return p.toString(pos);
        }
        return "";
    }
}
