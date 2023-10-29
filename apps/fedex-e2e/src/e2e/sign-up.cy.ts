describe('Sign up', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('fedex-nav a').click();
  });

  describe('Successfull registration', () => {
    it('should show a success message', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/photos/*',
        },
        {
          statusCode: 200,
          body: {
            albumId: 1,
            id: 7,
            thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc',
            title:
              'officia delectus consequatur vero aut veniam explicabo molestias',
            url: 'https://via.placeholder.com/600/b0f7cc',
          },
        }
      ).as('photoInterceptor');

      cy.intercept(
        {
          method: 'POST',
          url: '/users',
        },
        {
          statusCode: 200,
          body: {
            firstName: 'Jelle',
            lastName: 'Brouwer',
            email: 'brouwerjelle@hotmail.com',
            thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc',
            id: 11,
          },
        }
      ).as('userInterceptor');

      cy.get('input[id="firstName"]').type('John');
      cy.get('input[id="lastName"]').type('Doe');
      cy.get('input[id="email"]').type('johndoe@example.com');
      cy.get('input[id="password"]').type('superStrong');
      cy.get('button').click();
      cy.wait('@photoInterceptor');
      cy.wait('@userInterceptor');
      cy.get('.alert-success').contains('Sign up successful.');
    });
  });

  describe('Full name', () => {
    it('should disyplay the full name', () => {
      cy.get('input[id="firstName"]').type('John');
      cy.get('input[id="lastName"]').type('Doe');
      cy.get('.full-name').contains('John Doe');
    });
  });

  describe('Validation', () => {
    describe('First name not entered', () => {
      it('should show a notification', () => {
        cy.get('input[id="firstName"]').clear();
        cy.get('body').click(0, 0);
        cy.get('.alert-danger').contains('First name is required.');
      });
    });

    describe('Last name not entered', () => {
      it('should show a notification', () => {
        cy.get('input[id="lastName"]').clear();
        cy.get('body').click(0, 0);
        cy.get('.alert-danger').contains('Last name is required.');
      });
    });

    describe('Email', () => {
      describe('Not entered', () => {
        it('should show a notification', () => {
          cy.get('input[id="email"]').clear();
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains('Email is required.');
        });
      });
      describe('Not valid', () => {
        it('should show a notification', () => {
          cy.get('input[id="email"]').type('notvalid');
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains(
            'Provide a valid email address: john.doe@exmaple.com'
          );
        });
      });
    });

    describe('Pasword not valid', () => {
      describe('Not entered', () => {
        it('should show a notification', () => {
          cy.get('input[id="password"]').clear();
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains('Password is required.');
        });
      });
      describe('Too short', () => {
        it('should show a notification', () => {
          cy.get('input[id="password"]').type('short');
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains(
            'Password must be at least 8 characters long.'
          );
        });
      });
      describe('Not upper and lower case', () => {
        it('should show a notification', () => {
          cy.get('input[id="password"]').type('onlylowercase');
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains(
            'Password must contain a lower and upper case letter.'
          );
        });
      });
      describe('Contains firstName', () => {
        it('should show a notification', () => {
          cy.get('input[id="firstName"]').type('John');
          cy.get('input[id="password"]').type('somepasswordJohn');
          cy.get('body').click(0, 0);
          cy.get('.alert-danger').contains(
            'Password cannot contain your first name.'
          );
        });
      });
    });
  });

  describe('API  error', () => {
    it('should show an error message', () => {
      cy.intercept('GET', '/photos/*', {
        statusCode: 500,
      });
      cy.get('input[id="firstName"]').type('John');
      cy.get('input[id="lastName"]').type('Doe');
      cy.get('input[id="email"]').type('johndoe@example.com');
      cy.get('input[id="password"]').type('superStrong');
      cy.get('button').click();
      cy.get('.alert-danger').contains('Somehting went wrong.');
    });
  });
});
