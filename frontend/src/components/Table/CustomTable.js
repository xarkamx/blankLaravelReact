import React, { Component } from "react";
import { Helpers } from "../../core/helpers";
import IconButton from "@material-ui/core/IconButton";
import Table from "components/Table/Table.jsx";
import { FontIcon } from "../Icons/FontIcon";
import Button from "@material-ui/core/Button";
import { VerticalTable } from "../Lists/VerticalTable";
import { WallSize } from "../FilterWall/SizeWall";

/* eslint eqeqeq: 0*/
export class CustomTable extends Component {
  state = {
    page: 0,
    search: "",
    sort: { index: null, type: null }
  };
  pages = 8;
  responsiveSize = 600;
  _setDataPerPage(data, per = 10, page = 0, search = "") {
    if (data.length == 0) {
      return [];
    }

    const helpers = new Helpers();
    let filtered = [];
    filtered = helpers.searchInObject(data, search);
    if (filtered.length <= 0) {
      filtered = helpers.searchInObject(data, search.replace(/ /g, "|"));
    }
    data = filtered;
    this.contentSize = data.length;
    const from = per * page;
    const to = from + per;
    const filteredData = [];
    for (let pos = from; pos < to; pos++) {
      if (typeof data[pos] === "undefined") {
        continue;
      }

      filteredData.push(data[pos]);
    }
    return filteredData;
  }
  highlightWord(search, items) {
    if (search == "") {
      return items;
    }
    let regQuery = RegExp(search, "i");
    let content = `«${search}»`;
    items = items.map(item => {
      if (typeof item === "string") {
        return item.replace(regQuery, content);
      }
      return item;
    });
    return items;
  }

  _pageControl(per, page) {
    let pages = Math.ceil(this.contentSize / per);
    const top = pages > per ? 5 : pages;
    const min = page - 5;
    const items = [];
    if (page > 0) {
      items.push(
        <IconButton
          aria-label={"Page: " + page}
          size="small"
          key={"menos"}
          onClick={() => {
            this._setPage(page - 1);
          }}
        >
          <FontIcon iconName="fa-chevron-left" />
        </IconButton>
      );
    }

    for (let index = min; index < page; index++) {
      if (index < 0) {
        continue;
      }
      items.push(
        <IconButton
          aria-label={"Page: " + page}
          key={index + "fab"}
          size="small"
          color={index == page ? "primary" : "default"}
          onClick={() => {
            this._setPage(index);
          }}
        >
          {index + 1}
        </IconButton>
      );
    }
    for (let index = 0; index < top; index++) {
      let visualPage = index + page;
      if (visualPage >= pages) {
        continue;
      }
      items.push(
        <IconButton
          aria-label={"Page: " + page}
          size="small"
          key={index}
          color={visualPage == page ? "primary" : "default"}
          onClick={() => {
            this._setPage(visualPage);
          }}
        >
          {visualPage + 1}
        </IconButton>
      );
    }
    if (page < pages - 1) {
      items.push(
        <IconButton
          aria-label={"Page: " + page}
          key={"mas"}
          size="small"
          onClick={() => {
            this._setPage(page + 1);
          }}
        >
          <FontIcon iconName="fa-chevron-right" />
        </IconButton>
      );
    }

    return items;
  }
  _setPage = page => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({ page });
  };
  orderBy(titles) {
    return titles.map((item, key) => {
      const { index, type } = this.state.sort;
      let direction = "";
      if (key == index) {
        direction = type ? "-up" : "-down";
      }
      return (
        <React.Fragment key={key}>
          <span>{item}</span>
          <Button
            aria-label={"Order " + direction}
            size="small"
            onClick={() => {
              this.setState({
                sort: {
                  index: key,
                  type: !type
                }
              });
            }}
          >
            <FontIcon iconName={`fa-sort${direction}`} />
          </Button>
        </React.Fragment>
      );
    });
  }
  render = () => {
    const { titles, data, search } = this.props;
    const { page, sort } = this.state;
    const helpers = new Helpers();
    const direction = sort.type ? "asc" : "desc";
    const sortData =
      sort.index === null ? data : helpers.orderBy(data, sort.index, direction);
    const tableData = this._setDataPerPage(sortData, 8, page, search);
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%"
          }}
        >
          <i>Página Actual: {page + 1}</i>
          <WallSize maxSize={this.responsiveSize}>
            <main
              style={{
                width: "100%",
                overflowY: "auto",
                background: "#fafafa",
                borderRadius: "9px"
              }}
            >
              <VerticalTable titles={titles} data={tableData} />
            </main>
          </WallSize>
          <WallSize minSize={this.responsiveSize}>
            <Table
              tableHeaderColor="primary"
              tableHead={this.orderBy(titles)}
              tableData={tableData}
              className="customTable"
            />
          </WallSize>

          <center>{this._pageControl(this.pages, page)}</center>
        </div>
      </React.Fragment>
    );
  };
}
