package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type post struct {
	ID    int64  `json:"id"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

var posts = []post{{ID: 1, Title: "title1", Text: "hello"}}

func main() {
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
