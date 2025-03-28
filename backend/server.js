const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// Đảm bảo rằng file tồn tại trước khi đọc
const checkFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'assets/images'));
  },
  filename: (req, file, cb) => {
    const productName = req.body.name; // Tên sản phẩm
    const extension = path.extname(file.originalname); // Phần mở rộng
    const fileName = `${productName.replace(/\s+/g, '-').toLowerCase()}${extension}`; // Tên file
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Endpoint lấy danh sách tài khoản
app.get('/api/accounts', (req, res) => {
  const filePath = path.join(__dirname, 'data/accounts.json');
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Accounts file not found');
  }
  res.sendFile(filePath);
});

// Endpoint thêm sản phẩm
app.post('/api/items', upload.single('image'), (req, res) => {
  const newProduct = req.body;
  newProduct.sizes = JSON.parse(newProduct.sizes); // Xử lý size

  // Đảm bảo lưu đúng tên file hình ảnh và sử dụng đường dẫn đúng
  const imagePath = '/assets/images/' + req.file.filename;
  newProduct.image = imagePath;

  const filePath = path.join(__dirname, 'data/items.json');
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Items file not found');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }
    const items = JSON.parse(data);

    // Tính ID mới bằng cách lấy ID lớn nhất trong danh sách và cộng thêm 1
    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
    newProduct.id = maxId + 1;

    // Đảm bảo trường 'id' luôn nằm ở đầu
    const orderedProduct = {
      id: newProduct.id, // Đưa 'id' lên đầu
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      sizes: newProduct.sizes,
      image: newProduct.image
    };

    items.push(orderedProduct); // Thêm sản phẩm vào mảng

    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing items file');
      }
      res.status(201).send({ message: 'Product added successfully' });
    });
  });
});

app.put('/api/items/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  updatedProduct.sizes = JSON.parse(updatedProduct.sizes); // Xử lý size

  // Nếu có hình ảnh mới, sử dụng hình ảnh mới
  if (req.file) {
    const imagePath = '/assets/images/' + req.file.filename;
    updatedProduct.image = imagePath;
  }

  // Giữ nguyên id của sản phẩm
  updatedProduct.id = parseInt(id);

  const filePath = path.join(__dirname, 'data/items.json');
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Items file not found');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }

    let items = JSON.parse(data);
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      items[index] = updatedProduct;  // Cập nhật sản phẩm
    } else {
      return res.status(404).send('Product not found');
    }

    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing items file');
      }
      res.status(200).send({ message: 'Product updated successfully' });
    });
  });
});

// Endpoint lấy tất cả sản phẩm
app.get('/api/items', (req, res) => {
  const filePath = path.join(__dirname, 'data/items.json');
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Items file not found');
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }
    res.status(200).send(JSON.parse(data));
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, 'data/items.json');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Items file not found');
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }
    let items = JSON.parse(data);
    items = items.filter(item => item.id !== parseInt(id));  // Lọc sản phẩm cần xóa
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing items file');
      }
      res.status(200).send({ message: 'Product deleted successfully' });
    });
  });
});

// Endpoint đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, 'data/accounts.json');
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Accounts file not found');
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading accounts file');
    }
    const accounts = JSON.parse(data);
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    if (account) {
      res.status(200).send({ message: 'Login successful', account });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  });
});

// Endpoint lấy sản phẩm theo id
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;  // Lấy id từ params
  const filePath = path.join(__dirname, 'data/items.json');  // Đường dẫn đến tệp items.json

  if (!checkFileExists(filePath)) {
    return res.status(404).send('Items file not found');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }

    const items = JSON.parse(data);
    const product = items.find(item => item.id === parseInt(id));  // Tìm sản phẩm theo ID

    if (product) {
      res.status(200).json(product);  // Trả về sản phẩm
    } else {
      res.status(404).send('Product not found');  // Nếu không tìm thấy sản phẩm
    }
  });
});

// Endpoint lấy ảnh
app.get('/assets/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'assets/images', imageName);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('Image not found');
  }
});

app.post('/api/update-items', (req, res) => {
  const cartItems = req.body; // Giả sử bạn gửi dữ liệu giỏ hàng từ frontend
  const filePath = path.join(__dirname, 'data/items.json');
  
  if (!checkFileExists(filePath)) {
    return res.status(404).send('Items file not found');
  }
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }
    const items = JSON.parse(data);
    
    cartItems.forEach(cartItem => {
      const item = items.find(item => item.id === cartItem.id);
      if (item) {
        const size = item.sizes.find(size => size.size === cartItem.selectedSize);
        if (size) {
          size.quantity -= cartItem.quantity;
        }
      }
    });
    
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing items file');
      }
      res.status(200).send({ message: 'Items updated successfully' });
    });
  });
});


// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
