package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type post struct {
	ID    int64  `json:"id"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

var posts = []post{{ID: 1, Title: "title1", Text: "hello"}}

func main() {
	connect()
	router := gin.Default()
	router.GET("/post", getPost)
	router.POST("/post", postText)

	router.Run(":8000")
	fmt.Println("Starting server at port 8000")
}

func getPost(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	c.IndentedJSON(http.StatusOK, posts)
}

func postText(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	var newPostItem post

	if err := c.BindJSON(&newPostItem); err != nil {
		return
	}

	posts = append(posts, newPostItem)
	c.IndentedJSON(http.StatusCreated, newPostItem)
}

func connect() {
	dbconf := "docker:docker@tcp(localhost:3306)/sampledb?charset=utf8"

	db, err := sql.Open("mysql", dbconf)

	// 接続が終了したらクローズする
	defer db.Close()

	if err != nil {
		fmt.Println(err.Error())
	}

	err = db.Ping()

	if err != nil {
		fmt.Println("データベース接続失敗")
		return
	} else {
		fmt.Println("データベース接続成功")
	}
}
