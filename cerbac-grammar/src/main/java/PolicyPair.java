public class PolicyPair implements AST {

    String policyKey;
    String policyValue;

    public PolicyPair(String key, String value) {
        this.policyKey = key;
        this.policyValue = value;
    }
    
    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + policyKey + ":" + policyValue;
    }
}
