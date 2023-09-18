import { blurDiv, addMouseEvents, createObserver, waitForElementToDisplay } from '../blur.js';

describe('blurDiv', () => {
    it('should set the filter property to "blur(4px)"', () => {
        const div = document.createElement('div');
        blurDiv(div);
        expect(div.style.filter).toBe('blur(4px)');
    });
});

describe('addMouseEvents', () => {
    it('should call blurDiv on mouseout and unblurDiv on mouseover', () => {
        const div = document.createElement('div');
        blurDiv(div);
        addMouseEvents(div);

        const mouseoverEvent = new MouseEvent('mouseover');
        div.dispatchEvent(mouseoverEvent);
        expect(div.style.filter).toBe('none');

        const mouseoutEvent = new MouseEvent('mouseout');
        div.dispatchEvent(mouseoutEvent);
        expect(div.style.filter).toBe('blur(4px)');
    });
});

describe('createObserver', () => {
    it('should call blurDiv and addMouseEvents on childList mutation events', () => {
        const parentDiv = document.createElement('div');
        const addedNode = document.createElement('div');
        addedNode.classList.add('rx9719la');
        parentDiv.appendChild(addedNode);

        const observerCallback = jest.fn();
        const MutationObserver = jest.fn((callback) => {
            observerCallback.mockImplementation(callback);
            return {
                observe: jest.fn(),
            };
        });

        window.MutationObserver = MutationObserver;
        createObserver(parentDiv);

        const mutationRecord = {
            type: 'childList',
            addedNodes: [addedNode],
        };
        const mutationList = [mutationRecord];
        observerCallback(mutationList);

        expect(blurDiv).toHaveBeenCalledWith(addedNode);
        expect(addMouseEvents).toHaveBeenCalledWith(addedNode);
    });
});

describe('waitForElementToDisplay', () => {
    it('should call createObserver when the element is found', () => {
        const element = document.createElement('div');
        element.id = 'test-element';
        document.body.appendChild(element);

        const createObserverMock = jest.fn();
        const createObserverOriginal = createObserver;
        createObserver = createObserverMock;

        waitForElementToDisplay('#test-element', 1);

        expect(createObserverMock).toHaveBeenCalledWith(element);

        createObserver = createObserverOriginal;
        document.body.removeChild(element);
    });
});

