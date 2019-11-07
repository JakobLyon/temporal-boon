--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-05 12:09:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 16411)
-- Name: users; Type: TABLE; Schema: public; Owner: temp_boon_pg
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO temp_boon_pg;

--
-- TOC entry 196 (class 1259 OID 16409)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: temp_boon_pg
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO temp_boon_pg;

--
-- TOC entry 3818 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: temp_boon_pg
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 198 (class 1259 OID 16420)
-- Name: values; Type: TABLE; Schema: public; Owner: temp_boon_pg
--

CREATE TABLE public."values" (
    number integer
);


ALTER TABLE public."values" OWNER TO temp_boon_pg;

--
-- TOC entry 3685 (class 2604 OID 16414)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: temp_boon_pg
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3810 (class 0 OID 16411)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: temp_boon_pg
--

COPY public.users (userid, username, password) FROM stdin;
1	jakoblyon	test
\.


--
-- TOC entry 3811 (class 0 OID 16420)
-- Dependencies: 198
-- Data for Name: values; Type: TABLE DATA; Schema: public; Owner: temp_boon_pg
--

COPY public."values" (number) FROM stdin;
\.


--
-- TOC entry 3819 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: temp_boon_pg
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, true);


--
-- TOC entry 3687 (class 2606 OID 16419)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: temp_boon_pg
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3817 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: temp_boon_pg
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO temp_boon_pg;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-11-05 12:09:20

--
-- PostgreSQL database dump complete
--

