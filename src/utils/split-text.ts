type SplitOptions = {
  type?: "words" | "chars"
  preserveSpaces?: boolean
}

export function splitText(element: Element, options: SplitOptions = { type: "words" }): Element[] {
  const text = element.textContent || ""
  element.textContent = ""

  // Split by characters
  if (options.type === "chars") {
    const chars: Element[] = []

    // If we want to preserve spaces between words
    if (options.preserveSpaces) {
      // Split the text into words first
      const words = text.split(/(\s+)/)

      // Then split each word into characters, wrapping each word in a
      // non-breaking inline-block so chars stay together on narrow viewports.
      words.forEach((word) => {
        if (word.length === 0) return
        if (/^\s+$/.test(word)) {
          // This is a space/whitespace
          const space = document.createTextNode(word)
          element.appendChild(space)
        } else {
          // This is a word — wrap chars in a word group that won't break.
          const wordSpan = document.createElement("span")
          wordSpan.className = "split-word"
          wordSpan.style.whiteSpace = "nowrap"
          word.split("").forEach((char) => {
            const span = document.createElement("span")
            span.className = "split-char"
            span.textContent = char
            wordSpan.appendChild(span)
            chars.push(span)
          })
          element.appendChild(wordSpan)
        }
      })
    } else {
      // Original behavior - split all characters including spaces
      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.className = "split-char"
        span.textContent = char
        element.appendChild(span)
        chars.push(span)
      })
    }

    return chars
  }
  // Split by words (default)
  else {
    const words: Element[] = []

    text.split(/\s+/).forEach((word, i, arr) => {
      const span = document.createElement("span")
      span.className = "split-word"
      span.textContent = word
      element.appendChild(span)
      words.push(span)

      // Add space after word (except for the last word)
      if (i < arr.length - 1) {
        element.appendChild(document.createTextNode(" "))
      }
    })

    return words
  }
}
