/* global
  afterEach
  describe,
  beforeEach,
  it,
  jest,
*/
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ACEThemeProvider from '../ACEPrimaryTheme/ACEPrimaryTheme';
import SelectList from './SelectList';

// Test Utilities
import { getDOMNodeComputedStyle } from '../../../../../test/DOM';

// Constants
import {
  ACE_COLOR_MAIN_BLUE,
  ACE_COLOR_MAIN_GRAY,
} from '../../constants/colors';

function getFakeProps(overrides) {
  return {
    items: [
      { id: 0, value: 0, display: 'Wonder MAN' },
      { id: 1, value: 1, display: 'Iron Man' },
      { id: 2, value: 2, display: 'Captain A' },
    ],
    onSelect: jest.fn(v => v),
    ...overrides,
  };
}

function createSelectListWithTheme(props) {
  return mount(
    <ACEThemeProvider theme={props.theme}>
      <SelectList {...props} />
    </ACEThemeProvider>,
  );
}

describe('SelectList', () => {
  let spy;
  let props;
  let selectListWrapper;
  let listNode;

  beforeEach(() => {
    spy = sinon.spy();
    props = getFakeProps({ onSelect: spy });
    selectListWrapper = createSelectListWithTheme(props);
    listNode = selectListWrapper.getDOMNode();
  });

  afterEach(() => {
    selectListWrapper.unmount();
  });

  describe('base styles', () => {
    it('has width of 534px', () => {
      const widthStyle = getDOMNodeComputedStyle(listNode, 'width');
      expect(widthStyle).to.equal('534px');
    });

    it('has border of 2px', () => {
      const borderWidth = getDOMNodeComputedStyle(listNode, 'border-width');
      expect(borderWidth).to.equal('2px');
    });

    it('has border color of ACE_COLOR_MAIN_BLUE', () => {
      const borderStyle = getDOMNodeComputedStyle(listNode, 'border-color');
      expect(borderStyle).to.equal(ACE_COLOR_MAIN_BLUE);
    });

    it('has border radius of 4px', () => {
      const borderRadiusStyle = getDOMNodeComputedStyle(
        listNode,
        'border-radius',
      );
      expect(borderRadiusStyle).to.equal('4px');
    });

    it('has box shadow of 0 2px 8px 0 ACE_COLOR_MAIN_GRAY', () => {
      const boxShadowStyle = getDOMNodeComputedStyle(listNode, 'box-shadow');
      expect(boxShadowStyle).to.equal(`0 2px 8px 0 ${ACE_COLOR_MAIN_GRAY}`);
    });
  });

  describe('html rendering', () => {
    describe('renders listItem', () => {
      it('should match listItem text to item text', () => {
        selectListWrapper = createSelectListWithTheme(props);

        const listItems = selectListWrapper.find('li');
        listItems.forEach((listItem, i) => {
          expect(listItem.text()).to.equal(props.items[i].display);
        });
      });

      it('should match number of rendered items to passed items props', () => {
        selectListWrapper = createSelectListWithTheme(props);

        const listItems = selectListWrapper.find('li');

        expect(listItems.length).to.equal(props.items.length);
      });
    });

    describe('renders custom list item if display is defined', () => {
      beforeEach(() => {
        props = getFakeProps({
          items: [
            {
              id: 1,
              value: 1,
              display: <input type="checkbox" name="chk1" />,
              key: '1',
            },
            {
              id: 2,
              value: 2,
              display: <input id="checkbox" name="chk2" />,
              key: '2',
            },
          ],
        });
        selectListWrapper = createSelectListWithTheme(props);
      });

      it('should match number or rendered items to passed items props', () => {
        const items = selectListWrapper.find('input');

        expect(items.length).to.equal(props.items.length);
      });

      it('rendered element matched with item display', () => {
        const items = selectListWrapper.find('input[type="checkbox"]');

        items.forEach((item, i) => {
          expect(item.getDOMNode().type).to.equal(
            props.items[i].display.props.type,
          );
          expect(item.getDOMNode().name).to.equal(
            props.items[i].display.props.name,
          );
        });
      });
    });

    it('should throw error if invalid items is passed', () => {
      props = getFakeProps({
        items: [],
      });
      expect(() => {
        createSelectListWithTheme(props);
      }).to.throw('Invariant failed: items are empty');

      props = getFakeProps({
        items: null,
      });
      expect(() => {
        createSelectListWithTheme(props);
      }).to.throw('Invariant failed: items are empty');

      props = getFakeProps({
        items: undefined,
      });
      expect(() => {
        createSelectListWithTheme(props);
      }).to.throw('Invariant failed: items are empty');

      props = getFakeProps({
        items: [{}],
      });
      expect(() => {
        createSelectListWithTheme(props);
      }).to.throw(
        'Invariant failed: Invalid object keys are present. Keys should contain id, value and display',
      );
    });

    describe('event handlers', () => {
      it('selectListWrapper call it\'s click event handler', () => {
        selectListWrapper
          .find('li')
          .at(0)
          .simulate('click');

        expect(spy.calledOnce).to.equal(true);
        expect(spy.getCall(0).args[0]).to.be.equal(props.items[0]);
      });
    });
  });
});
