// ResponsiveContainer.tsx
import styled from '@emotion/styled';

const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 630px;
  width: 90%;
  background-color: #e9f0f8;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  &.super-app-theme {
    background-color: gray;
    border-bottom: solid 1px lightgray;
    align-content: baseline;
    color: red;
  }
  &.super-app-theme--header {
    background-color: black;
    font-size: 13px;
  }
  &.MuiDataGrid-cell {
    color: primary.main; // Note: This assumes you have a way to resolve this to a valid color value
    // border: none; // Uncomment or remove based on your requirements
  }
//   .MuiDataGrid-columnHeaders,
//   .MuiDataGrid-columnHeaders {
//     background-color: #f5f5f5;
//     color: rgba(0, 0, 0, 0.54);
//     font-size: 0.875rem;
//   }

//   .MuiDataGrid-row {
//     &:hover {
//       background-color: #f5f5f5;
//     }
//   }

  .MuiDataGrid-columnHeaders {
    font-family: "Poppins";
    font-weight: 600 !important;
    fonst-size: 16px !importtant; 
  }
}
`;

export default ResponsiveContainer;
