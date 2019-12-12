import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Table from "components/Table/Table.jsx";
import { FontIcon } from "../Icons/FontIcon";
import Button from "@material-ui/core/Button";
import { VerticalTable } from "../Lists/VerticalTable";
import { WallSize } from "../FilterWall/SizeWall";
import { AuthFetch } from "./../../utils/AuthFetch";

/* eslint eqeqeq: 0*/
export class AsyncTable extends Component {
  pages = 8;
  responsiveSize = 600;
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: props.search || "",
      sort: { index: "id", type: null },
      perPage: 10,
      content: []
    };
  }
  componentDidMount() {
    this._loadData({ page: 1 });
  }

  async _loadData({ page = 1, search, sort = {} }) {
    const { path, formatContent, args = {} } = this.props;
    const fetch = new AuthFetch(path);
    const order = this._setOrder(sort);
    const data = await fetch.get({
      page,
      search: search || this.state.search || "",
      perPage: this.state.perPage,
      ...order,
      ...args
    });
    this.contentSize = data.meta.last_page;
    let content = data.data.map(item => formatContent(item));
    this.setState({
      perPage: data.meta.per_page,
      page,
      content,
      sort,
      search: search
    });
  }
  _setOrder(sort) {
    const { type, index } = sort;
    return { orderType: type ? "asc" : "desc", orderBy: index || "id" };
  }
  _pageControl(per, page) {
    let pages = this.contentSize;
    const top = pages > per ? 5 : pages;
    const min = page - 5;
    const items = [];
    if (page > 1) {
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
      if (index < 1) {
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
          {index}
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
          {visualPage}
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
    this._loadData({ page, sort: this.state.sort, search: this.state.search });
  };
  orderBy(titles) {
    const items = [];
    for (let key in titles) {
      let item = titles[key];
      const { index, type } = this.state.sort;
      let direction = "";
      if (key == index) {
        direction = type ? "-up" : "-down";
      }
      items.push(
        <React.Fragment key={key}>
          <span>{item}</span>
          <Button
            aria-label={"Order " + direction}
            size="small"
            onClick={() => {
              let sort = {
                index: key,
                type: !type
              };
              this._loadData({
                page: this.state.page,
                sort,
                search: this.state.search
              });
            }}
          >
            <FontIcon iconName={`fa-sort${direction}`} />
          </Button>
        </React.Fragment>
      );
    }
    return items;
  }
  componentWillUpdate(nxt, prev) {
    if (nxt.reload != this.props.reload) {
      this._loadData({ page: 1, search: nxt.search });
    }
    if (nxt.search != this.props.search) {
      this._loadData({ page: 1, search: nxt.search });
    }
  }
  render = () => {
    const { titles } = this.props;
    const { page, perPage, content, search, sort } = this.state;
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%"
          }}
        >
          <i>
            Página Actual: {page} de {this.contentSize}
          </i>
          <WallSize maxSize={this.responsiveSize}>
            <main
              style={{
                width: "100%",
                overflowY: "auto",
                background: "#fafafa",
                borderRadius: "9px"
              }}
            >
              <VerticalTable titles={titles} data={content} />
            </main>
          </WallSize>
          <WallSize minSize={this.responsiveSize}>
            <Table
              tableHeaderColor="primary"
              tableHead={this.orderBy(titles)}
              tableData={content}
              className="customTable"
            />
          </WallSize>

          <center>
            {this._pageControl(perPage, page)}
            <br />
            por página:{" "}
            <select
              value={perPage}
              onChange={async ({ target }) => {
                await this.setState({ perPage: target.value });
                this._loadData({ page, search, sort });
              }}
            >
              <option>8</option>
              <option>20</option>
              <option>100</option>
            </select>
          </center>
        </div>
      </React.Fragment>
    );
  };
}
