describe('Dater',function(){
    var dateObj;
    beforeEach(function(){
        dateObj=new Date(2018,11,24);
    });
    describe("when dater is called on dateObj, it should convert date to our specified format",
    function(){
        it("should be able to convert date ",function(){
            expect(dater(dateObj)).toEqual('December 24 , 2018')
        })
    });
})