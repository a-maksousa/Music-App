import React from "react";
import MaterialTable from "material-table";

const DataTable = (props) => {
  return (
    <MaterialTable
      columns={props.columns}
      data={props.data}
      onRowClick={(evt, selectedRow) => {
        props.handleRowSelect(selectedRow);
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "No Data Found ...",
        },
      }}
      options={{
        maxBodyHeight: "60vh",
        sorting: false,
        draggable: false,
        emptyRowsWhenPaging: false,
        paging: false,
        toolbar: false,
        showTitle: false,
        search: false,
      }}
    />
  );
};

DataTable.defaultProps = {
  handleRowSelect: () => {},
};

export default DataTable;
