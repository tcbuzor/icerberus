

public class PolicyDecl implements AST {

    PolicyId pid;
    RuleBlock ruleBlock;

    public PolicyDecl(PolicyId pid) {
        this.pid = pid;
       // System.out.println("pid=" + pid.id);
    }

    public PolicyDecl(PolicyId pid, RuleBlock rb) {
        this.ruleBlock = rb;
        this.pid = pid;
    }
    
    @Override
    public String toString(int pos) {

        StringBuffer sb = new StringBuffer();
        String tabs = Utility.getTabs(pos);
        sb.append(pid.toString(pos)).append("\n");
        sb.append(tabs + "statements: [").append("\n");

        sb.append(ruleBlock.toString(pos+1));
        sb.append("\n").append(tabs + "]");
        return sb.toString();
    }
}
