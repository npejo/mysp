describe('CoreView', function() {
    describe('constructor', function() {
        before(function() {
            this.coreView = new MYSP.Views.CoreView({
                element: 'app-container'
            });
        });

        after(function() {
            this.coreView = null;
        });

        it('it should have `element` property set to null', function() {
            expect(this.coreView.element).to.equal(null);
        });

        it('it should have `subscribed` property set to false', function() {
            expect(this.coreView.subscribed).to.equal(false);
        });

        it('its `elementId` property should equal to the `element` value in options', function() {
            expect(this.coreView.elementId).to.equal('app-container');
        });

        it('its `subViews` property should equal to the `subViews` value in options', function() {
            expect(this.coreView.subViews).to.be.empty.and.to.be.an('object');

            var cv = new MYSP.Views.CoreView({
                subViews: {
                    view1: {},
                    view2: {}
                }
            });
            expect(cv.subViews).to.have.all.keys('view1', 'view2');
        });

        it('its `route` property should equal to the `route` value in options', function() {
            expect(this.coreView.route).to.be.empty.and.to.be.an('object');

            var cv = new MYSP.Views.CoreView({
                route: {
                    page: {},
                    id: {}
                }
            });
            expect(cv.route).to.have.all.keys('page', 'id');
        });
    });

    describe('render', function() {
        before(function() {
            this.renderSelfStub = sinon.stub(MYSP.Views.CoreView.prototype, 'renderSelf');
            this.renderSubviewsStub = sinon.stub(MYSP.Views.CoreView.prototype, 'renderSubviews');
            this.coreView = new MYSP.Views.CoreView({
                element: 'app-container'
            });
        });

        after(function() {
            this.renderSelfStub.restore();
            this.renderSubviewsStub.restore();
            this.coreView = null;
        });

        it('should invoke `renderSelf` and `renderSubviews`', function() {
            this.coreView.render();
            expect(this.renderSelfStub).to.be.calledOnce;
            expect(this.renderSubviewsStub).to.be.calledOnce;

        });
    });

    describe('renderSelf', function() {
        beforeEach(function() {
            this.addELStub = sinon.stub(MYSP.Views.CoreView.prototype, 'addEventListeners');
            this.getTemplateStub = sinon.stub(MYSP.Views.CoreView.prototype,
                'getTemplate').returns('Test Template!!!');
            this.coreView = new MYSP.Views.CoreView({
                element: 'app-container'
            });
        });

        afterEach(function() {
            this.addELStub.restore();
            this.getTemplateStub.restore();
            this.coreView = null;
        });

        it('should render its template and trigger adding event listeners', function() {
            this.coreView.renderSelf();
            var container = document.getElementById('app-container');
            expect(container.innerHTML).to.equal('Test Template!!!');
            expect(this.addELStub).to.be.calledOnce;
        });

        it('should render its template and DON\'T trigger adding event listeners', function() {
            this.coreView.renderSelf(true);
            var container = document.getElementById('app-container');
            expect(container.innerHTML).to.equal('Test Template!!!');
            expect(this.addELStub).to.not.have.been.called;
        });
    });

    describe('renderSubviews', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('updateRoute', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('updateSubviewsRoute', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('goTo', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('addListener', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('addListenerById', function() {
        it('should return -1 when the value is not present', function() {


        });
    });

    describe('addListenerByClass', function() {
        it('should return -1 when the value is not present', function() {


        });
    });
});