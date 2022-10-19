import S from "fluent-json-schema";

const url_pattern = /^http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/

export const Links = S.object()
    .prop('link', S.string().pattern(url_pattern).required())
    .valueOf()

