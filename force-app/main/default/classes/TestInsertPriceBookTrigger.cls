@isTest
private class TestInsertPriceBookTrigger {
    @isTest(seeAllData=true)
    static void validateTrigger() {
        Opportunity opp = new Opportunity(Name = 'Rakesh_SUV', AccountId = '001O000001oL3MvIAK', 
                    CloseDate = Date.today().addMonths(1), StageName = 'Requirement Analysis');
        
        insert opp;
             
        opp = [SELECT Pricebook2Id FROM Opportunity WHERE Id=:opp.Id];
        System.assertEquals('01s2w000000F5kwAAC', opp.Pricebook2Id, 'Actual & Expected PriceBook Id is not matching');
    }
}