const books = [
        {
          title: "Lập trình Node.js",
          author: "Nguyễn A",
          image:
            "https://website-assets.studocu.com/img/document_thumbnails/201f6c14874735823c4320e152241330/thumb_1200_1553.png",
        },
        {
          title: "Học JavaScript",
          author: "Trần B",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
          title: "Thiết kế Web",
          author: "Lê C",
          image: "https://cdn-icons-png.flaticon.com/512/919/919827.png",
        },
        {
          title: "Cơ sở dữ liệu",
          author: "Lê Long",
          image:
            "https://images.nxbxaydung.com.vn/Picture/2020/he-quan-tri-co-so-du-lieu-access-1029152401.jpg",
        },
        {
          title: "Lập trình Python",
          author: "Huy Phạm",
          image: "https://cdn0166.cdn4s.com/media/moon/1-lap-trinh-python.jpg",
        },
      ];

      // Hàm tìm kiếm
      function searchBook() {
        const keyword = document
          .getElementById("search-box")
          .value.toLowerCase();
        const resultDiv = document.getElementById("result");

        const results = books.filter(
          (b) =>
            b.title.toLowerCase().includes(keyword) ||
            b.author.toLowerCase().includes(keyword)
        );

        resultDiv.innerHTML = results.length
          ? results
              .map(
                (b) => `
              <div class="book_item">
                <img src="${b.image}">
                <div>
                  <b>${b.title}</b><br>
                  <small>Tác giả: ${b.author}</small>
                </div>
              </div>
            `
              )
              .join("")
          : "<p>Không tìm thấy sách.</p>";
      }

      // Xoá kết quả khi ô tìm kiếm rỗng
      function handleInput() {
        const keyword = document.getElementById("search-box").value.trim();
        if (keyword === "") {
          document.getElementById("result").innerHTML = "";
        } else {
          searchBook(); // tự động tìm khi đang gõ
        }
      }