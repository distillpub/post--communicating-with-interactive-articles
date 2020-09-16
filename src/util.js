import bibtexParse from 'bibtex-parse-js';
import bibString from '../static/bibliography.bib';

export function getBibtexEntries() {

  let bibliography = bibtexParse.toJSON(bibString);

  // filter out all bibtex entries except interactive article examples
  let examples = bibliography.filter(function (bibEntry) {
    return bibEntry.entryTags.howpublished === "web";
  });

  examples.forEach(citation => {
    // coerce tag string into array of strings
    citation.entryTags.tags = citation.entryTags.tags.split(',')

    // give examples with no journal string with space
    if (!citation.entryTags.journal) {
      citation.entryTags.journal = "Self published"
    }

    // publication/author format for table
    if (citation.entryTags.author) {
      let tempAuthor = citation.entryTags.author
      tempAuthor = tempAuthor.split(' and ')

      if (tempAuthor.length === 1) {

        // single author
        tempAuthor = tempAuthor[0].split(',')
        if (tempAuthor.length > 1) {

          // single author with first name and last name
          citation.entryTags.author = tempAuthor[1].trim() + ' ' + tempAuthor[0].trim()

        } else {

          // single author with one name (e.g., organization)
          citation.entryTags.author = tempAuthor[0]
          
        }

      } else {

        // multiple authors
        tempAuthor.forEach((author, i) => {
          author = author.split(',')
          tempAuthor[i] = author[1].trim() + ' ' + author[0].trim()
        });
        citation.entryTags.author = tempAuthor.join(', ')

      }
    }
  });

  return examples;

}
