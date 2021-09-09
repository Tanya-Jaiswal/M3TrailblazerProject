public class AccountRelatedObj {
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccount()
    {
        List<Account> accList=[SELECT Id,Name FROM Account ];
        return accList;
    }
    @auraEnabled
    public static List<Contact> getContacts(String accountId)
    {
        List<Contact> conList=[SELECT Id, Name, Email, AccountId FROM Contact WHERE AccountId=:accountId ];
        return conList;
    }
    @auraEnabled
    public static List<AggregateResult> countContact(String accountId)
    {
        List<AggregateResult> countCon=[SELECT COUNT(Id) cnt FROM Contact WHERE AccountId=:accountId ];
        return countCon;
    }
    @auraEnabled
    public static List<AggregateResult> countOpportunity(String accountId)
    {
        List<AggregateResult> countOpp=[SELECT COUNT(Id) cntopp FROM Opportunity WHERE AccountId=:accountId ];
        return countOpp;
    }
    @auraEnabled
    public static List<Opportunity> fetchOpportunity(String accountId)
    {
        List<Opportunity> oppList=[SELECT Id, Name, StageName, AccountId FROM Opportunity WHERE AccountId=:accountId ];
        return oppList;
    }  
    @auraEnabled
    public static List<AggregateResult> countClosedWonOpp(String accountId)
    {
        List<AggregateResult> oppList1=[SELECT COUNT(Id) Name, COUNT(StageName) FROM Opportunity WHERE StageName='Closed Won' and AccountId=:accountId ];
        return oppList1;
    }

    @auraEnabled
    public static List<AggregateResult> countClosedLostOpp(String accountId)
    {
        List<AggregateResult> oppList2=[SELECT COUNT(Id) Name, COUNT(StageName) FROM Opportunity WHERE StageName='Closed Lost' and AccountId=:accountId ];
        return oppList2;
    }
    @auraEnabled
    public static List<Opportunity> getAmountClosedWonOpp(String accountId)
    {
        List<Opportunity> oppList3=[SELECT Id,Name,Amount,AccountId FROM Opportunity WHERE StageName='Closed Won' and AccountId=:accountId ];
        return oppList3;
    }
    @auraEnabled
    public static List<AggregateResult> countCases(String accountId)
    {
        List<AggregateResult> countcs=[SELECT COUNT(Id) cntcs FROM Case WHERE AccountId=:accountId ];
        return countcs;
    }
    @auraEnabled
    public static List<Case> fetchCase(String accountId)
    {
        List<Case> csList=[SELECT Id, CaseNumber, Status, AccountId FROM Case WHERE AccountId=:accountId ];
        return csList;
    }
}