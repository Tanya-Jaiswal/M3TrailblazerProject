@isTest
class TestAccountRelatedObj {
     static testMethod void testAccountList (){
        Account acc = new Account(Name = 'Tesla', Phone ='9876543210');
        insert acc;

        Opportunity opp = new Opportunity(Name = 'Rakesh_SUV', AccountId = acc.Id,
                                        CloseDate = Date.today().addMonths(1), StageName = 'Requirement Analysis');
        insert opp;

        Contact cont = new Contact(FirstName='Aditya', LastName = 'Gatt', Phone ='9876543211', AccountId = acc.Id);
        insert cont;

        Case cs = new Case(Status = 'New', Origin = 'Email', AccountId = acc.Id);
        insert cs;

        AccountRelatedObj.fetchAccount();
        AccountRelatedObj.countContact( acc.Id );
        AccountRelatedObj.getContacts( acc.Id );
        AccountRelatedObj.countOpportunity( acc.Id );
        AccountRelatedObj.fetchOpportunity( acc.Id );
        AccountRelatedObj.countClosedWonOpp( acc.Id );
        AccountRelatedObj.countClosedLostOpp( acc.Id );
        AccountRelatedObj.getAmountClosedWonOpp( acc.Id );
        AccountRelatedObj.countCases( acc.Id );
        AccountRelatedObj.fetchCase( acc.Id );
    }
    @isTest(seeAllData=true)
    static  void validateTriggerPriceBook() {
        Account ac = new Account();
        ac.Name='Tesla';
        insert ac;
        Pricebook2 pb = new Pricebook2();
        pb.Name = 'Standard PriceBook';
        pb.IsActive = true;
        insert pb;
        Opportunity opp = new Opportunity(Name = 'Rakesh_SUV', AccountId = ac.Id,
                                        CloseDate = Date.today().addMonths(1), StageName = 'Requirement Analysis');

        insert opp;  
        Opportunity   op = [SELECT Id,Pricebook2Id FROM Opportunity WHERE Id=:opp.Id];
        Pricebook2 pb1 = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        //System.assertEquals(pb1.Id, op.Pricebook2Id, 'It is showing Error');
    }
}