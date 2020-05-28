import React, { Component } from "react";
import _ from "lodash";

export default class tableBody extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  renderCell = (item, column) => {
    return column.content ? column.content(item) : _.get(item, column.path);
  };
}
