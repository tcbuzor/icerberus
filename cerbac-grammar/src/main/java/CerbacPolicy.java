
public class CerbacPolicy implements AST {

    PolicyDecl pd;

    public CerbacPolicy(PolicyDecl pd) {
        this.pd = pd;
     //   System.out.println("pd=" + pd);
    }

    @Override
    public String toString(int tabPos) {
        return "policy = {\n" + pd.toString(tabPos + 1) + "\n" + "}";
        // return ("Program:\n" + stmtList.toString(pos + 1));
    }

//    private String printPolicyDeclarations(int pos) {
//        StringBuffer sb = new StringBuffer();
//        for(PolicyPair pd: policyPairs) {
//            sb.append(pd.toString(pos) + "\n");
//        }
//        return sb.toString();
//    }
}
