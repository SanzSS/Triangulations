import React, { Component } from "react";
import "../ExploreStyles/DisplayTable.css";

class ColumnLabels extends Component {
    render() {
        const {
            // sortAuthorNameOriginal,
            // sortAuthorNameTranslit,
            // sortTitleOriginal,
            // sortTitleTranslit,
            // sortLanguage,
            // sortGenre,
            // sortType,
            // sortDate,
            toggleSort,
        } = this.props;
    // const sortAuthorNameOriginal = () => {
        
    // }
        return (
          <thead>
            <tr class="header-footer">
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="AUTHOR NAME (ORIGINAL LANGUAGE): activate to sort column ascending"
                onClick={() => {
                  toggleSort("authorNameOriginal");
                }}
              >
                Author Name (Original Language)
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="1"
                rowSpan="1"
                colSpan="1"
                aria-label="AUTHOR NAME TRANSLITERATION: activate to sort column ascending"
                onClick={() => {
                  toggleSort("authorNameTranslit");
                }}
              >
                Author Name (Transliteration)
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="TITLE OF WORK (ORIGINAL LANGUAGE): activate to sort column ascending"
                onClick={() => {
                  toggleSort("titleOriginal");
                }}
              >
                Title of Work (Original Language)
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="TITLE OF WORK TRANSLITERATION: activate to sort column ascending"
                onClick={() => {
                  toggleSort("titleTranslit");
                }}
              >
                Title of Work (Transliteration)
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="LANGUAGE: activate to sort column ascending"
                onClick={() => {
                  toggleSort("language");
                }}
              >
                Language
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="GENRE: activate to sort column ascending"
                onClick={() => {
                  toggleSort("genre");
                }}
              >
                Genre
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="TYPE: activate to sort column ascending"
                onClick={() => {
                  toggleSort("textType");
                }}
              >
                Type
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="DATE: activate to sort column ascending"
                onClick={() => {
                  toggleSort("date");
                }}
              >
                Date
              </th>
              <th
                class="sorting text-[14px]"
                tabIndex="0"
                rowSpan="1"
                colSpan="1"
                aria-label="DIMENSION LABEL: activate to sort column ascending"
                onClick={() => {
                  toggleSort("label");
                }}
              >
                Dimension Label
              </th>
            </tr>
          </thead>
        );
    }
}

export default ColumnLabels;
