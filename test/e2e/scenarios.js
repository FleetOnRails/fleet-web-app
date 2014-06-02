describe("Unit Testing Examples", function() {

    beforeEach(angular.mock.module('fleetonrails'));

    it('should have a loginController controller', function() {
        expect(App.loginController).toBeDefined();
    });

    it('should have a working LoginService service', inject(['LoginService',
        function(LoginService) {
            expect(LoginService.isValidEmail).not.to.equal(null);

            // test cases - testing for success
            var validEmails = [
                'test@test.com',
                'test@test.co.uk',
                'test734ltylytkliytkryety9ef@jb-fe.com'
            ];

            // test cases - testing for failure
            var invalidEmails = [
                'test@testcom',
                'test@ test.co.uk',
                'ghgf@fe.com.co.',
                'tes@t@test.com',
                ''
            ];

        }])
    );
});