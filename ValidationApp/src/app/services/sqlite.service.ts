import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private databaseObj: SQLiteObject; // Database instance object
  private row_data: any = []; // Table rows
  private readonly database_name: string = "imageDB"; // DB name
  private readonly table_name: string = "image"; // Table name

  constructor(private sqlite: SQLite) { }

  get Rows_data(){
    return this.row_data;
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('freaky_datatable Database Created!');
        this.createTable();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  insertRow(image: string) {
    if (!image.length) {
      alert("Enter Name");
      return;
    }
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + image + '")', [])
      .then(() => {
        alert('Row Inserted!');
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  getRows() {
    return this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  deleteRow(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
}
