package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/thegreatjavascript/TianShu/web"
	"io/fs"
	"github.com/gin-gonic/gin"
	"github.com/pkg/browser"
)

func main() {
	r := gin.Default()
	fe, err := fs.Sub(web.FS, "dist")
	if err != nil {
		log.Fatal("Failed to sub path `dist`: %v", err)
	}
	r.StaticFS("/", http.FS(fe))
	fmt.Println("____")
	if err := browser.OpenURL("http://localhost:8080"); err !=nil{
		fmt.Println("打开浏览器URL失败")
	}
	r.Run()
}