
let editor;
editor = document.getElementById('editor');

var btn = document.getElementById('button-container')
const input = document.getElementById('input')
const output = document.getElementById('output');
const message = document.getElementById('message')

var Hellow = {
  c: '#include <stdio.h>\n\n' +
    'int main()\n' +
    '{\n\tprintf("Hellow world! welcome to online IDE");\n}',

  cpp: '#include<bits/stdc++.h>\n\n' +
    'using namespace std;\n' +
    'int main()\n' +
    '{\n\tcout<<"Hellow world! welcome to online IDE";\n}',
  python: 'print("Hellow world! welcome to online IDE")',
  node: 'console.log("Hellow world! welcome to online IDE");',
  java: 'public class Main\n' +
    '{\n' +
    '\tpublic static void main(String[] args) {\n' +
    '\t\tSystem.out.println("Hellow world! welcome to online IDE");\n' +
    '\t}\n' +
    '}',
  php: '<?php\n' +
    'echo "Hellow world! welcome to online IDE";'
};


// import { Hellow } from "./hellow.js";


window.onload = function () {
  btn.classList.add("light")
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/chrome");
  editor.setValue(Hellow.c)
  editor.session.setMode("ace/mode/c_cpp");//default c or cpp  
}


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var fild = document.getElementById('fild');
var list = document.getElementById('list');
var options = document.getElementsByClassName('options');
var selected = document.getElementById('selected');
var arrow = document.getElementById('arrow');
var language = 'c';

function dark() {
  btn.classList.toggle("light")
  btn.classList.add("dark")
}
function light() {
  btn.classList.toggle("dark")
  btn.classList.add("light")
}

fild.onclick = function () {
  list.classList.toggle("hide")
  arrow.classList.toggle("arrow")
}

list.onmouseleave = function () {
  list.classList.add('hide')
  arrow.classList.toggle("arrow")
}
function value(x) {
  switch (x) {
    case (1): return 'c';
    case (2): return 'cpp';
    case (3): return 'java';
    case (4): return 'php';
    case (5): return 'python';
    case (6): return 'node';
    default: break;
  }
}

let option;
for (option of options) {
  option.onclick = function () {
    selected.innerHTML = this.innerHTML;
    language = value(this.value);
    list.classList.toggle("hide")
    arrow.classList.toggle("arrow")
    changeLanguage(language)
  }
}

function copy() {
  navigator.clipboard.writeText(output.textContent)
  message.classList.toggle('hide')
  setTimeout(() => {
    message.classList.add('hide')
  }, 2000)
}

function clearout() {
  output.textContent = '';
}

function pastein() {
  navigator.clipboard.readText().then(cliptext => (document.getElementById('input').innerText = cliptext),
    err => console.log(err))
}

function changetheme() {
  theme= document.getElementById('theme').value
  if (theme == 0) {
    editor.setTheme("ace/theme/monokai")
    input.classList.add('input-output-dark')
    output.classList.add('input-output-dark')
    document.getElementById('theme').setAttribute('value',1)
  } else {
    editor.setTheme("ace/theme/chrome")
    input.classList.toggle('input-output-dark')
    output.classList.toggle('input-output-dark')
    document.getElementById('theme').setAttribute('value',0)
  }
}

function changeLanguage(language) {
  //console.log(language)
  if (language == 'c' || language == 'cpp') {
    if (language == 'cpp')
      editor.setValue(Hellow.cpp)
    if (language == 'c')
      editor.setValue(Hellow.c)
    editor.session.setMode("ace/mode/c_cpp");
  } else if (language == 'php') {
    editor.setValue(Hellow.php)
    editor.session.setMode("ace/mode/php");
  } else if (language == 'python') {
    editor.setValue(Hellow.python)
    editor.session.setMode("ace/mode/python");
  } else if (language == 'node') {
    editor.setValue(Hellow.node)
    editor.session.setMode("ace/mode/javascript");
  } else if (language == 'java') {
    editor.setValue(Hellow.java)
    editor.session.setMode("ace/mode/java");
  }
}

let url;
url = 'http://localhost:3000/';


async function executeCode() {

  // let language = document.getElementById('languages');
  // language=language.value
  //console.log(language)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify({
      language: language,
      editor: editor.getSession().getValue(),
      input: input.value
    })
  })

  console.log(res);

  const data = await res.json()
  if (data) document.getElementById('output').scrollIntoView();

  output.innerHTML = data;
}

