import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pg from "pg";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "gestionTec",
  password: "98490133",
  port: "5432",
});

db.connect((err) =>{
  if(err){
    console.log(err.stack)
  } else {
    console.log("Connected.")
  }
});