import java.util.ArrayList;

public class RuleBlock implements AST {
    ArrayList<PolicyRule> policyRules;

    public RuleBlock(ArrayList<PolicyRule> pRules) {
        this.policyRules = pRules;
    }
    
    @Override
    public String toString(int pos) {
        StringBuffer sb = new StringBuffer();
//        for(PolicyRule r: policyRules) {
//            sb.append(r.toString(pos));
//            sb.append(",").append("\n");
//        }
        int size = policyRules.size();
        for (int i = 0; i < size;i++){
            sb.append(policyRules.get(i).toString(pos));
            if (i + 1 < size) {
                sb.append(",").append("\n");
            }

        }
        return sb.toString();
    }
}
