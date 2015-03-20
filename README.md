Flotr2 widget
=============

This WireCloud widget allows you to create any graph supported by flotr2. See http://www.humblesoftware.com/flotr2/index for more info about what kind of graphics you can obtain using this widget.

This widget creates a Flotr2 using the configuration and data provided through wiring. In addition to this, this widget also has code for adding the following features:

* Mouse zoom

## Build

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io) in your system. For example, you can install it on Ubunutu and Debian running the following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

Install other npm dependencies by running:

```bash
npm install
```

For build the widget you need download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the **build** folder.