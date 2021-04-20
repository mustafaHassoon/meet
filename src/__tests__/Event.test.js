import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  beforeEach(() => {
    EventWrapper.setState({ showDetails: false });
  });

  test("render enough information", () => {
    expect(EventWrapper.find(".Event")).toHaveLength(1);
    expect(EventWrapper.find(".time")).toHaveLength(1);
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  test("render correct information", () => {
    expect(EventWrapper.find(".time").text()).toEqual("2020-05-20T14:00:00+02:00 - 2020-05-20T15:00:00+02:00");
    expect(EventWrapper.find(".summary").text()).toEqual("React is Fun");
  });

  test("click on details button should expand event details", () => {
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.find(".extra")).toHaveLength(1);
  });

  test("click on details button should collapse events", () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.find(".extra")).toHaveLength(0);
  });

  test("click on details button should collapse event details", () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.find(".extra")).toHaveLength(0);
  });

  test("Display extra info", () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find(".extra .location")).toHaveLength(1);
    expect(EventWrapper.find(".extra .htmlLink")).toHaveLength(1);
    expect(EventWrapper.find(".extra .description")).toHaveLength(1);
  });

  test("Display correct extra info", () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find(".extra .location").text()).toEqual(
      "Berlin, Germany"
    );
    expect(EventWrapper.find(".extra .htmlLink").prop("href")).toEqual(
      "https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20"
    );
    expect(EventWrapper.find(".extra .description").text()).toEqual(
      "Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. "
    );
  });
});