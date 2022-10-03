const slugify = require('slugify')

exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
    query getPages {
        allContentfulPage {
          nodes {
            id
            title
            sections {
              ... on ContentfulReferencedSection {
                id
                header
                sectionType
                references {
                  id
                  createdAt
                  linkTo
                  heading
                  buttonText
                  asset {
                    gatsbyImageData(
                      placeholder: BLURRED
                      layout: CONSTRAINED
                      resizingBehavior: SCALE
                    )
                    id
                  }
                  body {
                    raw
                  }
                  author
                  designation
                }
                referenceType
                linkTo
                buttonText
                createdAt(locale: "en-US")
              }
              ... on ContentfulSection {
                id
                body {
                  raw
                  references {
                    contentful_id
                    __typename
                    description
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
                asset {
                  gatsbyImageData(
                    resizingBehavior: SCALE
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                  title
                }
                buttonText
                header
                sectionType
                linkTo
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                subHeader {
                  subHeader
                }
              }
            }
          }
        }
      }
      
      
    `)

    data.allContentfulPage.nodes.forEach(({title}) => {

      const slug = slugify(title, {lower: true})

      actions.createPage({
        path: title === 'Home' ? '/' : slug,
        component: require.resolve(`./src/templates/page.tsx`),
        context: { title: title },
      })
    })
  }
