import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressBarDemo from './ProgressBarDemo';
import axios from 'axios';

describe('ProgressBarDemo', () => {
  it('Default ProgressBarDemo render', () => {
    const wrapper = shallow(<ProgressBarDemo />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('ProgressBarDemo - API Success', () => {
    it('Fetches API data', done => {
      const promise = new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: {
                buttons: [49, 29, -37, -34],
                bars: [86, 27, 39],
                limit: 210
              },
            }),
          100
        )
      );

      axios.get = jest.fn(() => promise);
      const wrapper = mount(<ProgressBarDemo />);

      expect(wrapper.instance().state.progressBars.length).toEqual(0);
      promise.then(() => {
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().state.progressBars.length).toEqual(3);
        axios.get.mockClear();
        done();
      });
    });
  });

  describe('ProgressBarDemo - API Failure', () => {
    it('Doesn\'t render progress bar data when API data fetch fails', async (done) => {
      const promise = new Promise((reject) =>
        setTimeout(
          () => reject({ error: 'Unable to fetch data from API' }),
          100
        ));

      axios.get = jest.fn(() => promise);
      const wrapper = mount(<ProgressBarDemo />);

      expect(wrapper.instance().state.progressBars.length).toEqual(0);
      promise.then(() => {
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.instance().state.progressBars.length).toEqual(0);
        axios.get.mockClear();
        done();
      });
    });
});

  it('Updates progress bar on percentage change', () => {
    const wrapper = shallow(<ProgressBarDemo />);
    wrapper.instance().setState({
      progressBars: [{
        barId: 1,
        value: 65,
        label: 'Progress Bar #1',
      },
      {
        barId: 2,
        value: 15,
        label: 'Progress Bar #2',
      },
      {
        barId: 3,
        value: 100,
        label: 'Progress Bar #3',
      }
      ],
      selectedBar: 2
    });

    wrapper.instance().onPercentageChange({
      target: {
        value: 25
      }
    });

    expect(wrapper.instance().state.progressBars[1].value).toEqual(40);
  });
  it('Updates selected progress bar on dropdown selection', () => {
    const wrapper = shallow(<ProgressBarDemo />);

    wrapper.instance().onProgressBarSelect({
      target: {
        value: 3
      }
    });

    expect(wrapper.instance().state.selectedBar).toEqual(3);
  });
});