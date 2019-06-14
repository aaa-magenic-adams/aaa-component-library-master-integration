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
import AAAThemeProvider from '../AAAPrimaryTheme/AAAPrimaryTheme';
import SelectListItemText from './SelectListItemText';

// Test Utilities
import { getDOMNodeComputedStyle } from '../../../../../test/DOM';

// Constants
import { AAA_COLOR_TRANSPARENT } from '../../constants/colors';

function getFakeProps(overrides) {
  return {
    item: { id: 1, value: 1, text: 'Yes' },
    onSelect: jest.fn(v => v),
    ...overrides,
  };
}

function createSelectListItemTextWithTheme(props) {
  return mount(
    <AAAThemeProvider theme={props.theme}>
      <SelectListItemText {...props} />
    </AAAThemeProvider>
  );
}

describe('SelectListItemText', () => {
  let spy;
  let props;
  let listItemTextWrapper;
  let listItemNode;

  beforeEach(() => {
    spy = sinon.spy();
    props = getFakeProps({ onSelect: spy });
    listItemTextWrapper = createSelectListItemTextWithTheme(props);
    listItemNode = listItemTextWrapper.getDOMNode();
  });

  afterEach(() => {
    listItemTextWrapper.unmount();
  });

  describe('html rendering', () => {
    it('rendered text should match passed options text', () => {
      props = getFakeProps({
        item: { id: 1, value: 1, text: 'I am Iron Man' },
      });

      listItemTextWrapper = createSelectListItemTextWithTheme(props);

      expect(listItemTextWrapper.text()).to.equal(props.item.text);
    });

    it('attaches a data-quid attribute to listItem element', () => {
      expect(
        listItemTextWrapper
          .find('li')
          .at(0)
          .getDOMNode().dataset.quid
      ).to.equal(`SelectListItem-${props.item.id}`);
    });

    it('attaches a value attribute to the listItem element', () => {
      expect(
        listItemTextWrapper
          .find('li')
          .at(0)
          .getDOMNode().value
      ).to.equal(props.item.value);
    });

    it('should not render list item if invalid item is passed', () => {
      props = getFakeProps({
        item: null,
      });
      listItemTextWrapper = createSelectListItemTextWithTheme(props);
      listItemNode = listItemTextWrapper.getDOMNode();

      expect(listItemNode).to.equal(null);

      props = getFakeProps({
        item: undefined,
      });
      listItemTextWrapper = createSelectListItemTextWithTheme(props);
      listItemNode = listItemTextWrapper.getDOMNode();

      expect(listItemNode).to.equal(null);

      props = getFakeProps({
        item: '',
      });
      listItemTextWrapper = createSelectListItemTextWithTheme(props);
      listItemNode = listItemTextWrapper.getDOMNode();

      expect(listItemNode).to.equal(null);

      props = getFakeProps({
        item: {},
      });
      expect(() => {
        createSelectListItemTextWithTheme(props);
      }).to.throw('id or value is empty.');
    });
  });

  describe('event handlers', () => {
    it('listItemTextWrapper call it\'s click event handler', () => {
      listItemTextWrapper.simulate('click');

      expect(spy.calledOnce).to.equal(true);
      expect(spy.getCall(0).args[0]).to.deep.equal({
        id: 1,
        value: 1,
        text: 'Yes',
      });
    });
  });

  describe('base styles', () => {
    it('has 48px height', () => {
      const heightStyle = getDOMNodeComputedStyle(listItemNode, 'height');
      expect(heightStyle).to.equal('48px');
    });

    it('has a transparent background', () => {
      const borderColorStyle = getDOMNodeComputedStyle(
        listItemTextWrapper.getDOMNode(),
        'background'
      );
      expect(borderColorStyle).to.equal(AAA_COLOR_TRANSPARENT);
    });
  });

  describe('list item states', () => {
    it('has selected className if selected', () => {
      props = getFakeProps({
        item: { id: 1, value: 1, display: 'I am Iron Man', selected: true },
      });

      listItemTextWrapper = createSelectListItemTextWithTheme(props);
      const listItem = listItemTextWrapper.find('li').get(0);

      expect(listItem.props.className).to.contains('selected');
    });
  });
});
