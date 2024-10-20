let fileContent = "";
let output = "";

const symbolDic = {
    "SP": 0, "LCL": 1, "ARG": 2, "THIS": 3, "THAT": 4,
    "R0": 0, "R1": 1, "R2": 2, "R3": 3, "R4": 4, "R5": 5, "R6": 6, "R7": 7, "R8": 8, "R9": 9, "R10": 10, "R11": 11, "R12": 12, "R13": 13, "R14": 14, "R15": 15,
    "SCREEN": 16384, "KBD": 24576
};

function cleanCode(content) {
    return content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('//'));
}

function labelTreatment(cleanLines) {
    let lineCount = 0;
    for (const line of cleanLines) {
        if (line.startsWith('(')) {
            let label = line.substring(1, line.length - 1);
            symbolDic[label] = lineCount;
        } else {
            lineCount++;
        }
    }
}

function CTraslation(comp, dest, jump) {
    const compDict = {
        "0": "0101010", "1": "0111111", "-1": "0111010",
        "D": "0001100", "A": "0110000", "M": "1110000",
        "!D": "0001101", "!A": "0110001", "!M": "1110001",
        "-D": "0001111", "-A": "0110011", "-M": "1110011",
        "D+1": "0011111", "A+1": "0110111", "M+1": "1110111",
        "D-1": "0001110", "A-1": "0110010", "M-1": "1110010",
        "D+A": "0000010", "D+M": "1000010", "D-A": "0010011",
        "D-M": "1010011", "A-D": "0000111", "M-D": "1000111",
        "D&A": "0000000", "D&M": "1000000", "D|A": "0010101",
        "D|M": "1010101"
    };
    const destDict = {
        "": "000", "M": "001", "D": "010", "MD": "011", "A": "100", "AM": "101", "AD": "110", "AMD": "111"
    };
    const jumpDict = {
        "": "000", "JGT": "001", "JEQ": "010", "JGE": "011",
        "JLT": "100", "JNE": "101", "JLE": "110", "JMP": "111"
    };
    const compBits = compDict[comp] || "0000000";
    const destBits = destDict[dest] || "000";
    const jumpBits = jumpDict[jump] || "000";

    return `111${compBits}${destBits}${jumpBits}`;
}

function traslation(cleanLines) {
    let lineCount = 0;
    let binaryCode = [];
    for (const line of cleanLines) {
        if (line.startsWith('@')) {
            let symbol = line.substring(1);
            let address = parseInt(symbol);
            if (isNaN(address)) {
                if (symbolDic[symbol] === undefined) {
                    symbolDic[symbol] = lineCount;
                }
                address = symbolDic[symbol];
            }
            binaryCode.push(address.toString(2).padStart(16, '0'));
        } else {
            let comp = "";
            let dest = "";
            let jump = "";
            if (line.includes('=')) {
                [dest, comp] = line.split('=');
            }
            if (line.includes(';')) {
                [comp, jump] = line.split(';');
            }
            binaryCode.push(CTraslation(comp, dest, jump));
            lineCount++;
        }
    }
    return binaryCode;
}

function work() {
    if (fileContent) {
        const cleanLines = cleanCode(fileContent);
        labelTreatment(cleanLines);
        let binaryCode = traslation(cleanLines);
        let output = binaryCode.join('\n');
        return output;
    } else {
        alert("Por favor, carga el archivo");
    }
}

const onSelectFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("No se seleccionó ningún archivo");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        fileContent = e.target.result;  
        output = work();
    };

    reader.readAsText(file);
};

function saveOutput() {
    const section = document.getElementsByClassName('form')[0];
    section.innerHTML = ` 
        <label for="file">Seleccione un archivo:</label>
        <input type="file" accept=".asm" name="file" id="file" title="Seleccione un archivo para cargar" placeholder="Seleccione un archivo" oninput="onSelectFile(event)">
        <input class="btn" type="submit" value="Traducir" onclick="saveOutput()">
        <h3>Traducción a binario:</h3>
        <pre class="boxed-text">${output}</pre>
    `;
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar archivo';
    downloadButton.onclick = function() {
        download('output.hack', output);
    };
    downloadButton.className = 'btn';
    section.appendChild(downloadButton);
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}