import java.util.List;

public class PolicyRule implements AST {
    PolicyExpr policyExpr;
    String stmtId;

    public PolicyRule(String stmtId, PolicyExpr policyExpr) {
        this.policyExpr = policyExpr;
        this.stmtId = stmtId;
    }
    
    @Override
    public String toString(int pos) {
        StringBuffer sb = new StringBuffer();
        String tabs = Utility.getTabs(pos);
        String tabs1 = Utility.getTabs(pos+1);
        sb.append(tabs + "{").append("\n");
        sb.append(tabs1 + "sid:" + stmtId + ",").append("\n");
        sb.append(policyExpr.toString(pos));
        sb.append("\n").append(tabs + "}");
        return sb.toString();
    }
}
